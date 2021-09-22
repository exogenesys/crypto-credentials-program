# On-Chain Program for CryptoCredentials

https://credentials.live

### To deploy for the first time:

1. Run `anchor build && anchor deploy`

### To build and update the local deployment, keeping the same program-id

- Run `anchor build && anchor upgrade ./target/deploy/crypto_credentials_program.so --program-id [program-id]`
