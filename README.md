# On-Chain Program for CryptoCredentials

For client app to interact: https://github.com/exogenesys/crypto-credentials

As we increasingly learn different things in our careers, it can be difficult for our online profile to reflect those achievements. Educators who give out credentials to their students, do it in the form of paper or, at most, on PDF.

The problem with on-paper/PDF credentials are as following:

- They can only be understood by humans
- They can easily be faked and counterfieted
- There is no de-facto standard to represent a credential accross the organisations and accross different countries
- They can be lost

Welcome, CryptoCredentials!

CryptoCredentials are nontransferable, but fungible (because all who do the same course, get the same token) token which is given out by educators/universities when their student attends a course, complete certain exercises, has x number of work-hours etc.

We believe CryptoCredentials are the next step for the evolution of the remote work landscape, which will smoothen the process of hiring and vetting for remote companies!

https://credentials.live

### To deploy for the first time:

- Run `anchor build && anchor deploy`

OR

- Run `yarn new`

### To build and update the local deployment, keeping the same program-id

- Run `anchor build && anchor upgrade ./target/deploy/crypto_credentials_program.so --program-id [program-id]`

OR

- Run `yarn update`
