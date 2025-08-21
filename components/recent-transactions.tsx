import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreditCard, Smartphone } from "lucide-react"

const transactions = [
  {
    id: 1,
    customer: "Ana Silva",
    email: "ana.silva@email.com",
    event: "Tech Summit 2024",
    amount: "R$ 299,90",
    method: "Cartão de Crédito",
    status: "Aprovado",
    time: "há 2 min",
    avatar: "/professional-woman.png",
  },
  {
    id: 2,
    customer: "Carlos Santos",
    email: "carlos@startup.com",
    event: "Feira de Negócios",
    amount: "R$ 199,90",
    method: "PIX",
    status: "Aprovado",
    time: "há 5 min",
    avatar: "/professional-man.png",
  },
  {
    id: 3,
    customer: "Maria Oliveira",
    email: "maria@empresa.com",
    event: "Congresso Médico",
    amount: "R$ 399,90",
    method: "Cartão de Crédito",
    status: "Processando",
    time: "há 8 min",
    avatar: "/business-woman.png",
  },
  {
    id: 4,
    customer: "João Costa",
    email: "joao@tech.com",
    event: "Workshop Design",
    amount: "R$ 149,90",
    method: "PIX",
    status: "Aprovado",
    time: "há 12 min",
    avatar: "/man-tech.png",
  },
]

export function RecentTransactions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-chart-1 text-white"
      case "Processando":
        return "bg-chart-2 text-white"
      case "Rejeitado":
        return "bg-chart-3 text-white"
      default:
        return "bg-chart-4 text-white"
    }
  }

  const getPaymentIcon = (method: string) => {
    return method === "PIX" ? Smartphone : CreditCard
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const PaymentIcon = getPaymentIcon(transaction.method)
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={transaction.avatar || "/placeholder.svg"} alt={transaction.customer} />
                    <AvatarFallback>
                      {transaction.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium text-foreground">{transaction.customer}</p>
                    <p className="text-xs text-muted-foreground">{transaction.event}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{transaction.amount}</p>
                    <div className="flex items-center space-x-1">
                      <PaymentIcon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{transaction.method}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{transaction.time}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
