# Disperse

Payment dispersal using [Multicall3](https://github.com/mds1/multicall). Inspired by <https://disperse.app>.

backend
    - [foundry](https://github.com/foundry-rs/foundry)

frontend
  - [NextJS](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
  - [Rainbow Kit](https://github.com/rainbow-me/rainbowkit)
  - [wagmi](https://github.com/tmm/wagmi)

## Set up

```bash=
yarn && cd packages/backend && make && cd -
```

## Scripts

`yarn build` - Build frontend
`yarn dev`   - Start development NextJS server

`yarn test`    - Test solidity contract
`yarn chain`   - Start local node with anvil
`yarn compile` - Build solidity contracts
`yarn deploy`  - Deploy solidity contract

## Usage

Contract deploymens require updates to `./packages/frontend/contsants.ts` unless using pre-computed address.