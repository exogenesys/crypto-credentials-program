import anchor from "@project-serum/anchor";
import program from "./program.js";
const provider = anchor.Provider.local();
const authority = provider.wallet.publicKey;

// const college = anchor.web3.Keypair.generate();
const collegeAuthority = anchor.Wallet.local().payer;
console.log("collegeAuthority", collegeAuthority.publicKey.toString());

const studentAccount = anchor.web3.Keypair.generate();
console.log("studentAccount", studentAccount.publicKey.toString());

const collegeAccount = anchor.web3.Keypair.generate();
console.log("collegeAccount", collegeAccount.publicKey.toString());

const courseNumber = 1;
const byteArray = new Uint8Array([0, 0, 0, 0, 0, 0, 0, courseNumber]);

async function airdrop(user, sol) {
  return await provider.connection.confirmTransaction(
    await provider.connection.requestAirdrop(user.publicKey, sol),
    "confirmed"
  );
}

export async function createCollege() {
  const airdropSignature = await airdrop(collegeAuthority, 10000000000);
  // console.log("airdropSignature", airdropSignature);
  const boardName = "Oxford College";

  await program.rpc.createCollege(boardName, {
    accounts: {
      college: collegeAccount.publicKey,
      authority: collegeAuthority.publicKey,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    },
    signers: [collegeAuthority, collegeAccount],
    instructions: [
      await program.account.college.createInstruction(collegeAccount, 300),
    ],
  });

  const collegeFetched = await program.account.college.fetch(
    collegeAccount.publicKey
  );

  console.log("collegeFetched.name", collegeFetched.name.toString());
  console.log("collegeFetched.authority", collegeFetched.authority.toString());
}

export async function createCourse() {
  const [courseKey, courseBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [collegeAccount.publicKey.toBuffer(), byteArray],
      program.programId
    );
  console.log("courseKey", courseKey.toString());
  const courseNameInput = "CS101";
  await program.rpc.createCourse(
    courseNameInput,
    new anchor.BN(courseNumber),
    courseBump,
    {
      accounts: {
        course: courseKey,
        college: collegeAccount.publicKey,
        authority: collegeAuthority.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [collegeAuthority],
    }
  );
  const course = await program.account.course.fetch(courseKey);
  console.log("course.name", course.name);
  console.log("courseNameInput", courseNameInput);
  console.log("course.authority", course.authority.toString());
}

export async function updateCourse() {
  const [courseKey, courseBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [collegeAccount.publicKey.toBuffer(), byteArray],
      program.programId
    );
  const courseNameUpdatedInput = "CS102";
  await program.rpc.updateCourse(
    courseNameUpdatedInput,
    new anchor.BN(courseNumber),
    courseBump,
    {
      accounts: {
        course: courseKey,
        college: collegeAccount.publicKey,
        authority: collegeAuthority.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [collegeAuthority],
    }
  );

  const updatedCourse = await program.account.course.fetch(courseKey);
  console.log("updatedCourse.name", updatedCourse.name);
  console.log("courseNameUpdatedInput", courseNameUpdatedInput);
}

export async function createCredential() {
  const [courseKey, courseBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [collegeAccount.publicKey.toBuffer(), byteArray],
      program.programId
    );

  const [credentialKey, credentialBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [courseKey.toBuffer(), byteArray],
      program.programId
    );

  console.log("credentialKey", credentialKey.toString());

  const credentialNameInput = "CS101";

  await program.rpc.createCredential(
    credentialNameInput,
    new anchor.BN(courseNumber),
    credentialBump,
    {
      accounts: {
        credential: credentialKey,
        student: studentAccount.publicKey,
        course: courseKey,
        college: collegeAccount.publicKey,
        authority: collegeAuthority.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [collegeAuthority],
    }
  );
  const credential = await program.account.credential.fetch(credentialKey);
  console.log("credential.name", credential.name);
  console.log("credentialNameInput", credentialNameInput);
  console.log("credential.authority", credential.authority.toString());
}

export async function updateCredential() {
  const [courseKey, courseBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [collegeAccount.publicKey.toBuffer(), byteArray],
      program.programId
    );

  const [credentialKey, credentialBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [courseKey.toBuffer(), byteArray],
      program.programId
    );

  const credentialNameUpdatedInput = "CS102";
  await program.rpc.updateCredential(
    credentialNameUpdatedInput,
    new anchor.BN(courseNumber),
    credentialBump,
    {
      accounts: {
        credential: credentialKey,
        student: studentAccount.publicKey,
        course: courseKey,
        college: collegeAccount.publicKey,
        authority: collegeAuthority.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [collegeAuthority],
    }
  );

  const updatedCredential = await program.account.credential.fetch(
    credentialKey
  );
  console.log("updatedCredential.name", updatedCredential.name);
  console.log("credentialNameUpdatedInput", credentialNameUpdatedInput);
}
