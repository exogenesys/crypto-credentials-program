use anchor_lang::prelude::*;

#[program]
pub mod crypto_credentials_program {
    use super::*;
    pub fn create_college(
        ctx: Context<CreateCollege>,
        board_name: Option<String>,
    ) -> ProgramResult {
        let college = &mut ctx.accounts.college;
        college.authority = *ctx.accounts.authority.to_account_info().key;
        college.name = board_name;
        Ok(())
    }

     pub fn create_course(
        ctx: Context<CreateCourse>,
        name: String,
        number: u64,
        bump: u8,
    ) -> ProgramResult {
        let course = &mut ctx.accounts.course;

        course.name = name;
        course.number = number;
        course.authority = *ctx.accounts.college.to_account_info().key;
        course.bump = bump;
        Ok(())
    }

    pub fn update_course(
        ctx: Context<UpdateCourse>,
        name: String,
        _number: u64,
        _bump: u8,
    ) -> ProgramResult {
        let course = &mut ctx.accounts.course;
        course.name = name;
        Ok(())
    }

    pub fn create_credential(
        ctx: Context<CreateCredential>,
        name: String,
        number: u64,
        bump: u8,
    ) -> ProgramResult {
        let credential = &mut ctx.accounts.credential;

        credential.name = name;
        credential.number = number;
        credential.authority = *ctx.accounts.college.to_account_info().key;
        credential.bump = bump;
        Ok(())
    }

    pub fn update_credential(
        ctx: Context<UpdateCredential>,
        name: String,
        _number: u64,
        _bump: u8,
    ) -> ProgramResult {
        let credential = &mut ctx.accounts.credential;
        credential.name = name;
        Ok(())
    }
}

// Define the validated accounts for each handler.
#[derive(Accounts)]
pub struct CreateCollege<'info> {
    #[account(init)]
    pub college: ProgramAccount<'info, College>,
    #[account(mut, signer)]
    authority: AccountInfo<'info>,
    rent: Sysvar<'info, Rent>,
    system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
#[instruction(name: String, number: u64, bump: u8)]
pub struct CreateCourse<'info> {
    #[account(
        init,
        seeds = [college.to_account_info().key.as_ref(), &number.to_be_bytes()],
        bump = bump,
        payer = authority,
        space = 320,
    )]
    course: ProgramAccount<'info, Course>,
    college: ProgramAccount<'info, College>,
    #[account(mut, signer)]
    authority: AccountInfo<'info>,
    system_program: AccountInfo<'info>,
}


#[derive(Accounts)]
#[instruction(name: String, number: u64, bump: u8)]
pub struct UpdateCourse<'info> {
    #[account(
        mut,
        seeds = [college.to_account_info().key.as_ref(), &number.to_be_bytes()],
        bump = bump,
    )]
    course: ProgramAccount<'info, Course>,
    #[account(has_one = authority)]
    college: ProgramAccount<'info, College>,
    #[account(mut, signer)]
    authority: AccountInfo<'info>,
    system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
#[instruction(name: String, number: u64, bump: u8)]
pub struct CreateCredential<'info> {
    #[account(
        init,
        seeds = [course.to_account_info().key.as_ref(), &number.to_be_bytes()],
        bump = bump,
        payer = authority,
        space = 320,
    )]
    credential: ProgramAccount<'info, Credential>,
    course: ProgramAccount<'info, Course>,
    college: ProgramAccount<'info, College>,
    #[account(mut, signer)]
    authority: AccountInfo<'info>,
    student: AccountInfo<'info>,
    system_program: AccountInfo<'info>,
}


#[derive(Accounts)]
#[instruction(name: String, number: u64, bump: u8)]
pub struct UpdateCredential<'info> {
    #[account(
        mut,
        seeds = [course.to_account_info().key.as_ref(), &number.to_be_bytes()],
        bump = bump,
    )]
    credential: ProgramAccount<'info, Credential>,
    course: ProgramAccount<'info, Course>,
    #[account(has_one = authority)]
    college: ProgramAccount<'info, College>,
    #[account(mut, signer)]
    authority: AccountInfo<'info>,
    student: AccountInfo<'info>,
    system_program: AccountInfo<'info>,
}

// Define the program owned accounts.
#[account]
pub struct College {
    name: Option<String>,
    authority: Pubkey,
}

#[account]
pub struct Course {
    name: String,
    number: u64,
    authority: Pubkey,
    bump: u8,
}

#[account]
pub struct Credential {
    name: String,
    number: u64,
    authority: Pubkey,
    bump: u8,
}