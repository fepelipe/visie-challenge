import { Inter } from "next/font/google";
import React from "react";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/router";

export default function Home() {
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

  const redirectPersonSeeMore = (id_pessoa: number) => {
    router.push("/person/");
  };

  const redirectPersonEdit = (id_pessoa: number) => {
    router.push("/person/edit");
  };

  const redirectAddPerson = () => {
    router.push("/person/add");
  };

  const deletePerson = async (id_pessoa: number) => {
    await fetch(`http://localhost:8080/api/v1/people/${id_pessoa}`, {
      method: "DELETE",
      mode: "cors",
    }).catch((err) => {
      throw new Error(err);
    });

    window.location.reload();
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <table className="border-collapse dark:table-dark">
        <thead className="text-left">
          <tr>
            <th>Nome</th>
            <th>Data de admissão</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {results.map((person) => (
            <tr key={person.id_pessoa} className="row-wrapper">
              <td className="cell-name">{person.nome}</td>
              <td className="cell-admission-date">{person.data_admissao}</td>
              <td>
                <div className={"flex justify-around cell-action-buttons"}>
                  <button
                    onClick={() => redirectPersonSeeMore(person.id_pessoa)}
                    className="w-9 h-9 rounded-md border bg-contain dark:bg-white btn-view-more"
                  ></button>
                  <button
                    onClick={() => redirectPersonEdit(person.id_pessoa)}
                    className="w-9 h-9 rounded-md border bg-contain dark:bg-white btn-edit"
                  ></button>
                  <button
                    onClick={() => deletePerson(person.id_pessoa)}
                    className="w-9 h-9 rounded-md border bg-contain dark:bg-white btn-delete"
                  ></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="h-14 w-32 rounded-md border" onClick={() => redirectAddPerson()}>Adicionar</button>
      </div>
    </main>
  );
}
