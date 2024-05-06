"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, Users } from "lucide-react";


interface DataProps {
  name: string;
  thisYear: number;
  lastYear: number;
}

const CreateDataSchema = z.object({
  thisMoth: z.string(),
  thisYearMoney: z.string().transform(x => parseInt(x)),

  lastYear: z.string(),
  lastYearMoney: z.string().transform(x => parseInt(x))
})

type CreateData = z.infer<typeof CreateDataSchema>

export default function Home() {

  const [data, setData] = useState<DataProps[]>([
    { name: 'Janeiro', thisYear: 4000, lastYear: 3000 },
    { name: 'Fevereiro', thisYear: 3000, lastYear: 2000 },
    { name: 'Março', thisYear: 2000, lastYear: 1500 },
    { name: 'Abril', thisYear: 2780, lastYear: 1890 },
    { name: 'Maio', thisYear: 1890, lastYear: 1230 },
    { name: 'Junho', thisYear: 2390, lastYear: 2100 },
    { name: 'Julho', thisYear: 3490, lastYear: 1500 },
    { name: 'Agosto', thisYear: 3490, lastYear: 2500 },
    { name: 'Setembro', thisYear: 3490, lastYear: 2200 },
  ])

  const [valorTotalAnoAtual, setValorTotalAnoAtual] = useState(0)
  const [valorTotalAnoPassado, setValorTotalAnoPassado] = useState(0)

  const [calcularMediaData, setCalcularMediaData] = useState(0)
  const [calcularMediaDataAnoPassado, setCalcularMediaDataAnoPassado] = useState(0)

  const [amplitudeAnoAtual, setAmplitudeAnoAtual] = useState(0)
  const [amplitudeAnoPassado, setAmplitudeAnoPassado] = useState(0)

  const [varianciaAnoAtual, setVarianciaAnoAtual] = useState(0)
  const [desvioPadraoAnoAtual, setDesvioPadraoAnoAtual] = useState(0)

  const [varianciaAnoPassado, setVarianciaAnoPassado] = useState(0)
  const [desvioPadraoAnoPassado, setDesvioPadraoAnoPassado] = useState(0)

  const { register, handleSubmit, control } = useForm<CreateData>({
    mode: "onSubmit",
    resolver: zodResolver(CreateDataSchema)
  })


  function handleSubmitData(data: CreateData) {
    const newData = {
      name: data.thisMoth,
      thisYear: data.thisYearMoney,
      lastYear: data.lastYearMoney
    }
    setData(prevData => [...prevData, newData]);
  }


  function calcularMediaAnoAtual() {
    const totalThisYear = data.reduce((acc, currentValue) => acc + currentValue.thisYear, 0);
    setValorTotalAnoAtual(totalThisYear)
    const media = totalThisYear / data.length
    setCalcularMediaData(media)
  }

  function calcularMediaAnoPassado() {
    const totalThisYear = data.reduce((acc, currentValue) => acc + currentValue.lastYear, 0);
    setValorTotalAnoPassado(totalThisYear)
    const media = totalThisYear / data.length
    setCalcularMediaDataAnoPassado(media)
  }

  function calcularAmplitudeAnoAtual() {
    let maiorThisYear = data[0].thisYear;
    let menorThisYear = data[0].thisYear;


    for (let i = 1; i < data.length; i++) {
      if (data[i].thisYear > maiorThisYear) {
        maiorThisYear = data[i].thisYear;
      }
    }


    for (let i = 1; i < data.length; i++) {
      if (data[i].thisYear < menorThisYear) {
        menorThisYear = data[i].thisYear;
      }
    }

    const valorDaAmplitude = maiorThisYear - menorThisYear;

    setAmplitudeAnoAtual(valorDaAmplitude)
  }

  function calcularAmplitudeAnoPassado() {
    let maiorlastYear = data[0].lastYear;
    let menorlastYear = data[0].lastYear;


    for (let i = 1; i < data.length; i++) {
      if (data[i].lastYear > maiorlastYear) {
        maiorlastYear = data[i].lastYear;
      }
    }


    for (let i = 1; i < data.length; i++) {
      if (data[i].lastYear < menorlastYear) {
        menorlastYear = data[i].lastYear;
      }
    }

    const valorDaAmplitude = maiorlastYear - menorlastYear;

    setAmplitudeAnoPassado(valorDaAmplitude)
  }

  function calcularVarianciaAnoAtual() {

    let varianciaAtual = 0;

    for (let i = 0; i < data.length; i++) {
      varianciaAtual += (data[i].thisYear - calcularMediaData) ** 2
    }

    const dataLeght = data.length

    const res = varianciaAtual / (dataLeght - 1)

    const desvioPadrao = Math.sqrt(res)

    setDesvioPadraoAnoAtual(desvioPadrao)

    setVarianciaAnoAtual(res)
  }

  function calcularVarianciaAnoPassado() {

    let varianciaAtual = 0;

    for (let i = 0; i < data.length; i++) {
      varianciaAtual += (data[i].lastYear - calcularMediaDataAnoPassado) ** 2
    }

    const dataLeght = data.length

    const res = varianciaAtual / (dataLeght - 1)

    const desvioPadrao = Math.sqrt(res)

    setDesvioPadraoAnoPassado(desvioPadrao)

    setVarianciaAnoPassado(res)
  }


  useEffect(() => {
    calcularMediaAnoAtual()
    calcularMediaAnoPassado()
    calcularAmplitudeAnoAtual()
    calcularAmplitudeAnoPassado()
    calcularVarianciaAnoAtual()
    calcularVarianciaAnoPassado()
  }, [valorTotalAnoAtual, valorTotalAnoPassado, calcularMediaData, calcularMediaDataAnoPassado, amplitudeAnoAtual, amplitudeAnoPassado, varianciaAnoAtual, desvioPadraoAnoAtual, varianciaAnoPassado, desvioPadraoAnoPassado, data, setData])





  return (
    <main className="flex flex-col  max-w-7xl mx-auto min-h-screen  ">

      <div className="w-full  p-6">
        <h1 className="text-white text-xl font-black">SOFTWARE DE COMPARAÇÃO DE GANHOS ANUAIS</h1>
      </div>

      <form onSubmit={handleSubmit(handleSubmitData)} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  gap-4  rounded-md p-6">


          <div className="flex flex-col gap-2">
            <Label className="text-white">Selecione o mês</Label>
            <Controller
              control={control}
              name="thisMoth"
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className=" bg-black text-white">
                      <SelectValue placeholder="selecione o mês" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white">
                      <SelectItem value="Janeiro">Janeiro</SelectItem>
                      <SelectItem value="Fevereiro">Fevereiro</SelectItem>
                      <SelectItem value="Março">Março</SelectItem>
                      <SelectItem value="Abril">Abril</SelectItem>
                      <SelectItem value="Maio">Maio</SelectItem>
                      <SelectItem value="Junho">Junho</SelectItem>
                      <SelectItem value="Julho">Julho</SelectItem>
                      <SelectItem value="Agosto">Agosto</SelectItem>
                      <SelectItem value="Setembro">Setembro</SelectItem>
                      <SelectItem value="Outubro">Outubro</SelectItem>
                      <SelectItem value="Novembro">Novembro</SelectItem>
                      <SelectItem value="Dezembro">Dezembro</SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <Label className="text-white">Gasto do mês</Label>
            <Input className="bg-black text-white" type="number" placeholder="Digite o gasto do mês" {...register("thisYearMoney")} />
          </div>

   

 

          <div className="flex flex-col gap-2 ">
            <Label className="text-white">Ano que deseja comparar</Label>
            <Input className="bg-black text-white" placeholder="Digite o ano" {...register("lastYear")} />
          </div>


          <div className="flex flex-col gap-2 ">
            <Label className="text-white">Gasto do mês</Label>
            <Input className="bg-black text-white" type="number" placeholder="Digite o gasto do mês" {...register("lastYearMoney")} />
          </div>

          <Button variant={"outline"} className="mt-[22px] bg-black text-white hover:bg-white hover:text-black">Inserir</Button>

        

      </form>

      <div className="grid grid-cols-1  gap-4  rounded-md p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Card className="bg-transparent text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Média de 2024
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calcularMediaData.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
              <p className="text-xs text-muted-foreground">
                {calcularMediaDataAnoPassado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} Média de 2017
              </p>
            </CardContent>
          </Card>

          <Card className="bg-transparent text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Amplitude</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{amplitudeAnoAtual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
              <p className="text-xs text-muted-foreground">{amplitudeAnoPassado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} ano de 2017</p>
            </CardContent>
          </Card>

          <Card className="bg-transparent text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Variância</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{varianciaAnoAtual.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{varianciaAnoPassado.toFixed(2)} ano de 2017</p>
            </CardContent>
          </Card>

          <Card className="bg-transparent text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Desvio padrão</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{desvioPadraoAnoAtual.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{desvioPadraoAnoPassado.toFixed(2)} ano de 2017</p>
            </CardContent>
          </Card>
        </div>


        <Card className="bg-transparent text-white">
          <CardHeader>
            <CardTitle>Gasto por mês</CardTitle>
            <div className="flex items-center gap-2 w-full justify-between">
              <CardDescription>O gráfico mostra o valor do gasto atual comparado com o ano passado</CardDescription>
              <div className="max-md:hidden">
                <p className="text-muted-foreground">Gasto total do ano atual: {valorTotalAnoAtual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                <p className="text-muted-foreground">Gasto total do ano passado: {valorTotalAnoPassado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[320px] ">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={730} height={250} data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} dy={16} />
                <YAxis width={100} stroke="#888" axisLine={false} tickLine={false} tickFormatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <Tooltip />
                <Legend />
                <Bar dataKey="thisYear" fill="#7c3aed" name={"Ano atual"} barSize={20} radius={[4, 4, 0, 0]} />
                <Bar dataKey="lastYear" fill="#14b8a6" name={"Ano passado"} barSize={20}  radius={[4, 4, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
