import { Wix_Madefor_Display, Saira } from "next/font/google";
import React, { useEffect, useState } from "react";
const wix = Wix_Madefor_Display({ subsets: ["latin"] });
const saira = Saira({ subsets: ["latin"] });

import { useRouter } from "next/router";

export default function Home() {
  const [people, setPeople] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/people")
      .then((response) => response.json())
      .then((data) => setPeople(data));
  }, []);

  const router = useRouter();

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

  const mainContent = people.length ? (
    <div className="flex min-h-screen flex-col items-center">
      <table className="mb-10">
        <thead className="text-left text-2xl table-header">
          <tr>
            <th>Nome</th>
            <th>Data de admissão</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={`${wix.className}`}>
          {people.map((person) => (
            <tr key={person.id_pessoa} className="row-wrapper">
              <td className="cell-name">{person.nome}</td>
              <td className="cell-admission-date">{person.data_admissao}</td>
              <td>
                <div className={"flex justify-around cell-action-buttons"}>
                  <button
                    onClick={() => redirectPersonSeeMore(person.id_pessoa)}
                    className="w-9 h-9 rounded-md border bg-contain bg-white btn-view-more"
                  ></button>
                  <button
                    onClick={() => redirectPersonEdit(person.id_pessoa)}
                    className="w-9 h-9 rounded-md border bg-contain bg-white btn-edit"
                  ></button>
                  <button
                    onClick={() => deletePerson(person.id_pessoa)}
                    className="w-9 h-9 rounded-md border bg-contain bg-white btn-delete"
                  ></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="self-start">
        <button
          className="h-14 w-32 rounded-md border"
          onClick={() => redirectAddPerson()}
        >
          Adicionar
        </button>
      </div>
    </div>
  ) : (
    <div>
      <label>Carregando...</label>
    </div>
  );

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${saira.className}`}
    >
      {mainContent}
    </main>
  );
}
