import Image from "next/image";
import { Inter } from "next/font/google";
import { redirect } from "next/dist/server/api-utils";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Person() {
  const router = useRouter();

  const person = {
    id_pessoa: 1,
    nome: "Alberto Vieira",
    rg: "25.507.105-2",
    cpf: "168.637.122-53",
    data_nascimento: "1997-07-01",
    data_admissao: "2020-09-28",
  };

  const params = useParams();

  const deletePerson = () => {};

  const editPerson = () => {
    router.push("/person/edit");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* <label>Registro selecionado {params.id}</label> */}
      <div className="flex flex-col">
        <label>Nome: {person.nome}</label>
        <label>RG: {person.rg}</label>
        <label>CPF: {person.cpf}</label>
        <label>Data de nascimento: {person.data_nascimento}</label>
        <label>Data de admissão: {person.data_admissao}</label>
      </div>
      <div className="flex justify-around w-72">
        <button className="h-14 w-32 rounded-md border" onClick={() => editPerson()}>Editar</button>
        <button className="h-14 w-32 rounded-md bg-red-500" onClick={() => deletePerson()}>Excluir</button>
      </div>
    </main>
  );
}
