import Image from "next/image";
import { Inter } from "next/font/google";
import { redirect } from "next/dist/server/api-utils";
import React from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function PersonEdit() {
  const router = useRouter();
  const results = [
    {
      id_pessoa: 1,
      nome: "Alberto Vieira",
      rg: "25.507.105-2",
      cpf: "168.637.122-53",
      data_nascimento: "1997-07-01",
      data_admissao: "2020-09-28",
    },
    {
      id_pessoa: 2,
      nome: "Alexandre Teixeira",
      rg: "79.474.888-8",
      cpf: "877.733.889-89",
      data_nascimento: "1982-08-16",
      data_admissao: "2020-05-15",
    },
    {
      id_pessoa: 3,
      nome: "Ana Carolina Souza",
      rg: "52.565.667-8",
      cpf: "766.370.920-96",
      data_nascimento: "1982-03-19",
      data_admissao: "2016-08-19",
    },
    {
      id_pessoa: 4,
      nome: "Ana Paula Soares",
      rg: "54.744.331-9",
      cpf: "746.917.734-52",
      data_nascimento: "1984-09-01",
      data_admissao: "2019-08-25",
    },
    {
      id_pessoa: 5,
      nome: "Antônio Siqueira",
      rg: "81.669.888-5",
      cpf: "695.991.412-45",
      data_nascimento: "1990-07-26",
      data_admissao: "2016-05-18",
    },
    {
      id_pessoa: 6,
      nome: "Arthur Silva",
      rg: "43.204.402-9",
      cpf: "345.898.157-88",
      data_nascimento: "1996-12-30",
      data_admissao: "2016-04-28",
    },
    {
      id_pessoa: 7,
      nome: "Bárbara Santos",
      rg: "57.106.623-3",
      cpf: "587.914.225-66",
      data_nascimento: "2000-09-04",
      data_admissao: "2018-11-17",
    },
  ];

  const savePerson = () => {};

  const cancel = () => {
    router.push("/");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <label>Atualizar dados de registro</label>
      <div className="flex flex-col justify-around h-72">
        <div className="flex flex-col">
          <label>Nome</label>
          <input></input>
        </div>
        <div className="flex flex-col">
          <label>RG</label>
          <input></input>
        </div>
        <div className="flex flex-col">
          <label>CPF</label>
          <input></input>
        </div>
        <div className="flex flex-col">
          <label>Data de nascimento</label>
          <input></input>
        </div>
        <div className="flex flex-col">
          <label>Data de admissão</label>
          <input></input>
        </div>
      </div>
      <div className="flex justify-around w-72">
        <button
          className="h-14 w-32 rounded-md bg-white text-black"
          onClick={() => savePerson()}
        >
          Salvar
        </button>
        <button
          className="h-14 w-32 rounded-md border"
          onClick={() => cancel()}
        >
          Cancelar
        </button>
      </div>
    </main>
  );
}
