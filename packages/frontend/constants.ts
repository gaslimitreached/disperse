import Contract from './contracts/Payments.json';

interface DispersalDappConfig {
  APP_NAME: string,
  DESCRIPTION?: string,
  NODE_ENV?: string,
  CONTRACTS: Record<string, any>,
}

export const constants: DispersalDappConfig = {
  APP_NAME: 'Disperse',
  DESCRIPTION: 'Transfers ETH (or any token) in a single call.',
  NODE_ENV: process.env.NODE_ENV?? 'development',
  CONTRACTS: {
    DISPERSER: {
      ADDRESS: '0xb78bdcf3957f2eD7EB957fCBBF1Cf8Ca8314D67e',
      ABI: Contract.abi
    },
  },
}
