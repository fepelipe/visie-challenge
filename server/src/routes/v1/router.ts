import express from "express";
import { sqlQuery } from "../../db";
import cors from "cors";

const router = express.Router();

router.use(cors());

router.options("*", cors());

router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.post("/people/", (req, res) => {
  const { name, rg, cpf, birth_date, admission_date } = req.body;
  const querySelect =
    "INSERT INTO pessoas (`nome`,`rg`,`cpf`,`data_nascimento`,`data_admissao`) VALUES (?, ?, ?, ?, ?);";
  sqlQuery(
    querySelect,
    [name, rg, cpf, birth_date, admission_date],
    (result: any) => {
      res.sendStatus(200);
    }
  );
});

router.get("/people/", (req, res) => {
  const querySelect = "SELECT id_pessoa, nome, data_admissao FROM pessoas;";
  sqlQuery(querySelect, [], (result: any) => {
    const people = result.map((person: any) => {
      return {
        ...person,
        data_admissao: person.data_admissao.toISOString().split("T")[0],
      };
    });
    res.json(people);
  });
});

router.get("/people/:id", (req, res) => {
  const { id } = req.params;
  const querySelect = "SELECT * FROM pessoas WHERE id_pessoa=?;";
  sqlQuery(querySelect, [id], (result: any) => {
    const person = result[0];
    const response = {
      ...person,
      data_admissao: person.data_admissao.toISOString().split("T")[0],
      data_nascimento: person.data_nascimento.toISOString().split("T")[0],
    };
    res.json(response);
  });
});

router.put("/people/:id", (req, res) => {
  const { name, rg, cpf, birth_date, admission_date } = req.body;
  const { id } = req.params;
  const querySelect =
    "UPDATE pessoas SET `nome`=?, `rg`=?, `cpf`=?, `data_nascimento`=?, `data_admissao`=? WHERE `id_pessoa`=?;";
  sqlQuery(
    querySelect,
    [name, rg, cpf, birth_date, admission_date, id],
    (result: any) => {
      res.sendStatus(200);
    }
  );
});

router.delete("/people/:id", (req, res) => {
  const { id } = req.params;
  const querySelect = "DELETE FROM pessoas WHERE id_pessoa=?;";
  sqlQuery(querySelect, [id], (result: any) => {
    res.sendStatus(200);
  });
});

export default router;
