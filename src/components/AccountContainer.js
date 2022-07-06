import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const url = "http://localhost:8001/transactions";

  // fetch transactions
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      });
  }, []);

  // add transaction
  const addTransactionHandler = (description, category, amount, date) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        category,
        amount,
        date,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions([...transactions, data]);
      });
  };

  // search transactions
  const searchHandler = (search) => {
    const filteredTransactions = transactions.filter((transaction) => {
      return transaction.description
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    setTransactions(filteredTransactions.slice(-1));
  };

  return (
    <div>
      <Search search={searchHandler} />
      <AddTransactionForm addTransaction={addTransactionHandler} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
