import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client"
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { p2pTransfer } from "../../lib/actions/p2pTransfer";

async function getOutgoingTransaction() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: - t.amount,
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
        amount: + t.amount,
        direction : "incoming"
    }))
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
    const inTransactions = await getIncomingTransaction();
    const outTransactions = await getOutgoingTransaction();
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
                    <P2PTransactions transactions={outTransactions} />
                    <P2PTransactions transactions={inTransactions} />
                </div>
            </div>
        </div>
    </div>
}