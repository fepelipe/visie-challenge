import express from "express";
import { sqlQuery } from "../../db";
import { PersonSchema } from "../../db/models";
import { ConsumeLocation, OrderStatus, Role } from "../../utils/const";

const router = express.Router();

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
    res.json(result);
  });
});

router.get("/people/:id", (req, res) => {
  const { id } = req.params;
  const querySelect = "SELECT * FROM pessoas WHERE id_pessoa=?;";
  sqlQuery(querySelect, [id], (result: any) => {
    res.json(result);
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
