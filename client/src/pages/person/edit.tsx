import { Saira, Wix_Madefor_Display } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
const saira = Saira({ subsets: ["latin"] });
const wix = Wix_Madefor_Display({ subsets: ["latin"] });

export default function PersonEdit() {
  const [person, setPerson] = useState(null as any);
  const [name, setName] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [admission_date, setAdmissionDate] = useState("");

  const searchParams = useSearchParams()
  const id_pessoa = searchParams.get('id');
  
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/people/${id_pessoa}`)
      .then((response) => response.json())
      .then((data) => {
        const person = data;
        setPerson(person);
        setName(person.nome);
        setRg(person.rg);
        setCpf(person.cpf);
        setBirthDate(person.data_nascimento);
        setAdmissionDate(person.data_admissao);
      });
  }, [id_pessoa]);

  const router = useRouter();

  const onPersonSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const person = { name, rg, cpf, birth_date, admission_date };
    await fetch(`http://localhost:8080/api/v1/people/10`, {
      method: "PUT",
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

  const mainContent = person ? (
    <form
      onSubmit={onPersonSubmit}
      className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      <label className="font-bold text-2xl">Atualizar dados de registro</label>
      <div className={`flex flex-col justify-around h-96 ${wix.className}`}>
        <div className="flex flex-col">
          <label>Nome</label>
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
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
  ) : (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <label>Carregando...</label>
    </div>
  );

  return <main className={`${saira.className}`}>{mainContent}</main>;
}
