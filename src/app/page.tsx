'use client'

import { cookies } from 'next/headers'

import { User } from 'lucide-react'
import { useState } from 'react'

const categories = [
  {
    id: 2,
    name: 'Ativo',
  },
  {
    id: 3,
    name: 'Pendente',
  },
  {
    id: 4,
    name: 'Cancelado',
  },
  {
    id: 5,
    name: 'Concluído',
  },
]

const rentalsMock = [
  {
    id: 1,
    customerName: 'Willame Mouzinho',
    status: 'Ativo',
    duration: 60,
    customerEmail: 'willame.mouzinho@gmail.com',
  },
  {
    id: 2,
    customerName: 'Lailla Galeno',
    status: 'Ativo',
    duration: 60,
    customerEmail: 'lailla.galeno@gmail.com',
  },
  {
    id: 3,
    customerName: 'Matheus Araujo',
    status: 'Pendente',
    duration: 60,
    customerEmail: 'matheus.araujo@gmail.com',
  },
  {
    id: 4,
    customerName: 'Thiago Aquino',
    status: 'Concluído',
    duration: 60,
    customerEmail: 'thiago.aquino@gmail.com',
  },
  {
    id: 5,
    customerName: 'Bruna Silva',
    status: 'Cancelado',
    duration: 60,
    customerEmail: 'bruna.silva@gmail.com',
  },
]

export default function Home() {
  const isAuthenticated = cookies().has('token')

  const [activeStatus, setActiveStatus] = useState('Todos')
  const [rentals, setRentals] = useState(rentalsMock)

  function handleChangeStatus(status: string) {
    setActiveStatus(status)

    if (status === 'Todos') {
      setRentals(rentalsMock)
      return
    }

    setRentals(rentalsMock.filter((rental) => rental.status === status))
  }

  return (
    <main>
      <div className="flex items-center gap-3 p-4 text-sm">
        <button
          onClick={() => handleChangeStatus('Todos')}
          className={`rounded-full px-3 py-1 transition-all ${
            activeStatus === 'Todos' && 'bg-orange-500 text-white'
          }`}
        >
          Todos
        </button>
        {categories.map((status) => {
          return (
            <button
              key={status.id}
              onClick={() => handleChangeStatus(status.name)}
              className={`rounded-full px-3 py-1 transition-all ${
                status.name === activeStatus && 'bg-orange-500 text-white'
              }`}
            >
              {status.name}
            </button>
          )
        })}
      </div>

      <div className="rounded-lg px-4 text-sm">
        <div className="grid grid-cols-[auto_160px_160px] bg-zinc-200 p-3 text-zinc-600">
          <span>Nome do cliente</span>
          <span>Duração</span>
          <span>Status</span>
        </div>

        <ul className="flex flex-col gap-4 bg-zinc-50 p-4">
          {rentals.map((rental) => {
            return (
              <li key={rental.id} className="grid grid-cols-[auto_160px_160px]">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 bg-zinc-300">
                    <User className="h-4 w-4" />
                  </div>

                  <div className="flex flex-col text-xs font-medium">
                    {rental.customerName}
                    <span className="text-[0.625rem] font-normal">
                      {rental.customerEmail}
                    </span>
                  </div>
                </div>

                <span>{rental.duration} minutos</span>

                <span
                  className={`flex h-fit w-fit items-center justify-center rounded-full px-2 py-1 text-xs ${
                    rental.status === 'Ativo'
                      ? 'bg-emerald-100 text-emerald-500'
                      : rental.status === 'Cancelado'
                      ? 'bg-red-100 text-red-500'
                      : rental.status === 'Pendente'
                      ? 'bg-yellow-100 text-yellow-500'
                      : 'bg-blue-100 text-blue-500'
                  }`}
                >
                  {rental.status}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
