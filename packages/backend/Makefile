.PHONY: all
# include .env file and export its env vars
# (-include to ignore error if it does not exist)
-include .env

all: clean remove install update build

# Clean the repo
clean  :; forge clean

# Remove modules
remove :; rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules

# Install the Modules
install :;
	forge install --no-commit foundry-rs/forge-std

# Update Dependencies
update:; forge update

# Builds
build  :; forge clean && forge build --optimize --optimizer-runs 200

# Deploy
deploy :; forge create Contract --interactive && cp ./out/Contract.sol/*.json ../frontend/contracts
