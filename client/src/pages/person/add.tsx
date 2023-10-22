import { Saira, Wix_Madefor_Display } from "next/font/google";
import React, { useState } from "react";
import { useRouter } from "next/router";
const saira = Saira({ subsets: ["latin"] });
const wix = Wix_Madefor_Display({ subsets: ["latin"] });

export default function PersonEdit() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [admission_date, setAdmissionDate] = useState("");

  const onPersonSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const person = { name, rg, cpf, birth_date, admission_date };
    await fetch(`http://localhost:8080/api/v1/people/`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(person),
      headers: { "Content-Type": "application/json" },
    }).catch((err) => {
      throw new Error(err);
    });

    router.push("/");
  };

  const cancel = () => {
    router.push("/");
  };

  return (
    <main className={`${saira.className}`}>
      <form
        onSubmit={onPersonSubmit}
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${saira.className}`}
      >
        <label className="font-bold text-2xl">Adicionar registro</label>
        <div className={`flex flex-col justify-around h-96 ${wix.className}`}>
          <div className="flex flex-col">
            <label>Nome</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label>RG</label>
            <input value={rg} onChange={(e) => setRg(e.target.value)}></input>
          </div>
          <div className="flex flex-col">
            <label>CPF</label>
            <input value={cpf} onChange={(e) => setCpf(e.target.value)}></input>
          </div>
          <div className="flex flex-col">
            <label>Data de nascimento</label>
            <input
              value={birth_date}
              onChange={(e) => setBirthDate(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label>Data de admissão</label>
            <input
              value={admission_date}
              onChange={(e) => setAdmissionDate(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="flex justify-around w-72">
          <button
            className="h-14 w-32 rounded-md bg-white text-black"
            type="submit"
          >
            Salvar
          </button>
          <button
            className="h-14 w-32 rounded-md border"
            onClick={() => cancel()}
            type="button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}
