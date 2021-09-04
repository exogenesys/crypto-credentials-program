import fs from "fs";
import anchor from "@project-serum/anchor";
import { PROGRAM_ID } from "./constants.js";

const idl = JSON.parse(
  fs.readFileSync("./target/idl/crypto_credentials_program.json", "utf8")
);

// Address of the deployed program.
const programId = new anchor.web3.PublicKey(PROGRAM_ID);

const program = new anchor.Program(idl, programId);

export default program;
