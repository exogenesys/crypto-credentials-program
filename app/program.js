import fs from "fs";
import anchor from "@project-serum/anchor";
import config from "./config.js";

const idl = JSON.parse(
  fs.readFileSync("./target/idl/crypto_credentials_program.json", "utf8")
);

// Address of the deployed program.
const programId = new anchor.web3.PublicKey(config.localnet.programId);

const program = new anchor.Program(idl, programId);

export default program;
