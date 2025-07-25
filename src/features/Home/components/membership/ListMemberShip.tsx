import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Star } from "lucide-react";
import type { MembershipSaved } from "../../models/membership/MembershipSaved";


interface Props{
  setSelectedPlan:React.Dispatch<React.SetStateAction<MembershipSaved|null>>
  filteredPlans:MembershipSaved[]
  setFilterActive:React.Dispatch<React.SetStateAction<string>>
  filterActive: string;
  selectedPlan: MembershipSaved | null;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>
  
}
export function ListMemberShip({
  setSelectedPlan,
  filteredPlans,
  setFilterActive,
  filterActive,
  selectedPlan,
  setIsCreate
}:Props) {

  function handleOnSelectPlan(planSelected:MembershipSaved){
    setIsCreate(false);
    setSelectedPlan(planSelected)
  }

  function handleOnClickNewPlan(){
    setIsCreate(true);
    setSelectedPlan(null)
  }
  return (
    <div className="col-span-12 md:col-span-3 md:p-6 backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col h-full overflow-auto " >
      <div className="mb-6 w-full">
        <div className="flex flex-col xl:flex-row items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Planes</h2>
          <div className="flex space-x-2">
            <Select value={filterActive} onValueChange={setFilterActive}>
              <SelectTrigger className="w-auto lg:w-32 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
            <Button
              size="sm"
              className="bg-white/10 hover:bg-white/20 border-white/20"
              type="button"
              onClick={handleOnClickNewPlan}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        
      </div>

      {/* Plans List */}
      <div className="space-y-1 h-full overflow-y-auto">
        {filteredPlans.map((plan, index) => {
          const IconComponent = Star;
          return (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all duration-500 scale-95 hover:scale-100 backdrop-blur-sm border-white/10 ${
                selectedPlan?.id === plan.id
                  ? "bg-gradient-to-r from-emerald-500/30 to-teal-600/30 border-emerald-500/50 shadow-2xl shadow-emerald-500/25"
                  : "bg-white/5 hover:bg-white/10"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={()=>handleOnSelectPlan(plan)}
            >
              <CardContent className="p-2">
                <div className="flex items-center flex-col lg:flex-row justify-between ">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg`}
                    >
                    <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-gray-300">
                        ${plan.price_plan.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {plan.is_active ? (
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mt-2 lg:mt-0">
                      Activo
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-gray-500/20 text-gray-400"
                    >
                      Inactivo
                    </Badge>
                  )}
                </div>

                {/* <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{plan?.members} miembros</span>
                  <div
                    className={`flex items-center space-x-1 ${
                      plan.growth > 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    <span>
                      {plan?.growth > 0 ? "+" : ""}
                      {plan?.growth}%
                    </span>
                  </div>
                </div>

                <Progress
                  value={(plan?.members / 500) * 100}
                  className="mt-2 h-1"
                /> */}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
