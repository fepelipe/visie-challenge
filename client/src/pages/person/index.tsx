import { Saira, Wix_Madefor_Display } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
const saira = Saira({ subsets: ["latin"] });
const wix = Wix_Madefor_Display({ subsets: ["latin"] });

export default function Person() {
  const [person, setPerson] = useState(null as any);
  const router = useRouter();
  const searchParams = useSearchParams()
  const id_pessoa = searchParams.get('id');

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/people/${id_pessoa}`)
      .then((response) => response.json())
      .then((data) => setPerson(data));
  }, [id_pessoa]);


  const deletePerson = async () => {
    await fetch(`http://localhost:8080/api/v1/people/${id_pessoa}`, {
      method: "DELETE",
      mode: "cors",
    }).catch((err) => {
      throw new Error(err);
    });

    router.push("/");
  };

  const editPerson = () => {
    router.push(`/person/edit?id=${id_pessoa}`);
  };

  const mainContent = person ? (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <label className="font-bold text-2xl">Registro selecionado</label>
      <div className={`flex flex-col ${wix.className}`}>
        <label>
          <span className={`font-bold ${saira.className}`}>Nome:</span>{" "}
          {person.nome}
        </label>
        <label>
          <span className={`font-bold ${saira.className}`}>RG:</span>{" "}
          {person.rg}
        </label>
        <label>
          <span className={`font-bold ${saira.className}`}>CPF:</span>{" "}
          {person.cpf}
        </label>
        <label>
          <span className={`font-bold ${saira.className}`}>
            Data de nascimento:
          </span>{" "}
          {person.data_nascimento}
        </label>
        <label>
          <span className={`font-bold ${saira.className}`}>
            Data de admissão:
          </span>{" "}
          {person.data_admissao}
        </label>
      </div>
      <div className="flex justify-around w-72">
        <button
          className="h-14 w-32 rounded-md border"
          onClick={() => editPerson()}
        >
          Editar
        </button>
        <button
          className="h-14 w-32 rounded-md bg-red-500"
          onClick={() => deletePerson()}
        >
          Excluir
        </button>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <label>Carregando...</label>
    </div>
  );

  return <main className={`${saira.className}`}>{mainContent}</main>;
}
