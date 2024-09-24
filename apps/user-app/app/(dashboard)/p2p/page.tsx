import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client"
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { P2PTransactions } from "../../../components/P2PTransactions";

async function getOutgoingTransaction() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: -1*t.amount,
        direction : "outgoing"
    }))
}

async function getIncomingTransaction() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        direction : "incoming"
    }))
}

async function getAllTransactions() {
    const outgoingTxns = await getOutgoingTransaction();
    const incomingTxns = await getIncomingTransaction();
    const combinedTxns = [...outgoingTxns, ...incomingTxns];
    combinedTxns.sort((a, b) => b.time.getTime() - a.time.getTime());
    return combinedTxns;
}


async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export default async function() {
    const balance = await getBalance();
    const transactions= await getAllTransactions();
    return <div className="w-full">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Help a Friend
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <P2PTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}