//build a simple transaction management system for a bank account
// class bank account
class BankAccount {
    constructor() {
        this.balance = 0;
        // to store transaction records as objects
        this.transactions = [];
    }
    //Method for making a deposit
    deposit(amount) {
        if (amount > 0) {
            this.transactions.push({
                type: "deposit",
                amount,
            });
            this.balance += amount;
            return `Successfully deposited $${amount}. New balance: $${this.balance}`
        } else {
            return "Deposit amount must be greater than zero."
        }
    }

    //Method for withdrawing funds
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.transactions.push({
                type: "withdraw",
                amount,
            });
            this.balance -= amount;
            return `Successfully withdrew $${amount}. New balance: $${this.balance}`
        } else {
            return "Insufficient balance or invalid amount."
        }
    }

    checkBalance() {
        return `Current balance: $${this.balance}`;
    }

    //List of all deposits
    listAllDeposits() {
        const deposits = this.transactions
            .filter(item => item.type === "deposit")
            .map(item => item.amount);
        return `Deposits: ${deposits.join(",")}`;
    }

    //List of all withdrawals
    listAllWithdrawals() {
        const withdrawals = this.transactions
            .filter(item => item.type === "withdraw")
            .map(item => item.amount);
        return `Withdrawals: ${withdrawals.join(",")}`;
    }
}

const myAccount = new BankAccount();
console.log(myAccount.deposit(200));
console.log(myAccount.deposit(150));
console.log(myAccount.deposit(100));
console.log(myAccount.withdraw(50));
console.log(myAccount.withdraw(100));
console.log(myAccount.checkBalance());
console.log(myAccount.listAllDeposits());
console.log(myAccount.listAllWithdrawals());