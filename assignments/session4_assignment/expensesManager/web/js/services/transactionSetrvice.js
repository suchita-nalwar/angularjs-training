/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


myApp.factory("transactionSetrvice", [function() {
        var transactionType1 = "Income";
        var transactionType2 = "Expense";
        var selectedTransaction = {};
        var transactionCopy = {};

        var transactionDetails = [{
                transactionID: 1,
                payer: 'Globant',
                payee: 'self',
                category: 'Salary',
                subCategory: {
                    parentcategoryName: 'Salary',
                    subCategoryName: 'Salary'
                },
                amount: 50000,
                mop: 'Electronic Transfer',
                date: new Date("january 23, 2016 14:13:00"),
                notes: 'Ontime',
                type: 'Income'
            }, {
                transactionID: 2,
                payer: 'LIC',
                payee: 'self',
                category: 'Business',
                subCategory: {
                    parentcategoryName: 'Business',
                    subCategoryName: 'Lic Agent'
                },
                amount: 20000,
                mop: 'Electronic Transfer',
                date: new Date("january 25, 2016 11:13:00"),
                notes: 'Less business',
                type: 'Income'
            }, {
                transactionID: 3,
                payer: 'Bank Of Maharashtra',
                payee: 'self',
                category: 'Interest',
                subCategory: {
                    parentcategoryName: 'Interest',
                    subCategoryName: 'Interest'
                },
                amount: 10000,
                mop: 'Electronic Transfer',
                date: new Date("january 26, 2016 10:13:00"),
                notes: '4.5% of intrest recieved',
                type: 'Income'
            }, {
                transactionID: 4,
                payer: 'Bank Of Maharashtra',
                payee: 'self',
                category: 'Deposit',
                subCategory: {
                    parentcategoryName: 'Deposit',
                    subCategoryName: 'Fixed Deposit'
                },
                amount: 5000,
                mop: 'Cheqe',
                date: new Date("january 01, 2016 19:13:00"),
                notes: '4.5% of intrest recieved',
                type: 'Income'
            }, {
                transactionID: 5,
                payer: 'self',
                payee: 'Satish Joshi',
                category: 'Rent',
                subCategory: {
                    parentcategoryName: 'Rent',
                    subCategoryName: 'House Rent'
                },
                amount: 10000,
                mop: 'Credit Card',
                date: new Date("january 25, 2016 16:13:00"),
                notes: 'House rent',
                type: 'Expense'
            }, {
                transactionID: 6,
                payer: 'self',
                payee: 'PURPLE',
                category: 'Travel',
                subCategory: {
                    parentcategoryName: 'Travel',
                    subCategoryName: 'Out Of City'
                },
                amount: 5000,
                mop: 'Cash',
                date: new Date("january 27, 2016 16:13:00"),
                notes: 'Travel to home',
                type: 'Expense'
            }, {
                transactionID: 7,
                payer: 'self',
                payee: 'Miami',
                category: 'Party',
                subCategory: {
                    parentcategoryName: 'Party',
                    subCategoryName: 'Personal Party'
                },
                amount: 10000,
                mop: 'Cash',
                date: new Date("january 14, 2016 16:13:00"),
                notes: 'other expenses',
                type: 'Expense'
            }, {
                transactionID: 8,
                payer: 'self',
                payee: 'Prachi restaurant',
                category: 'Office',
                subCategory: {
                    parentcategoryName: 'Office',
                    subCategoryName: 'Lunch and Snacks'
                },
                amount: 2000,
                mop: 'Debit Card',
                date: new Date("january 28, 2016 16:13:00"),
                notes: 'lunch and snax',
                type: 'Expense'
            }, {
                transactionID: 9,
                payer: 'self',
                payee: 'Mnd Tree',
                category: 'Studies',
                subCategory: {
                    parentcategoryName: 'Studies',
                    subCategoryName: 'Professional'
                },
                amount: 10000,
                mop: 'Electronic Transfer',
                date: new Date("january 22, 2016 16:13:00"),
                notes: 'Office study books',
                type: 'Expense'
            }, {
                transactionID: 10,
                payer: 'self',
                payee: 'Pantaloons',
                category: 'Shopping',
                subCategory: {
                    parentcategoryName: 'Shopping',
                    subCategoryName: 'Clothes and Accessories'
                },
                amount: 10000,
                mop: 'Credit Card',
                date: new Date("january 21, 2016 16:13:00"),
                notes: 'Holiday shopping',
                type: 'Expense'
            }];
        return{
            transactionList: function() {
                return transactionDetails;
            },
            sortBy: function(self, columnName) {
                self.column = columnName;
                self.descending = !self.descending;
            },
            generateTransactionId: function() {
                return Math.floor(Math.random() * 10000) + 1;
            },
            sum: function(array, propertyName, transactionType) {
                return array.reduce(function(a, b) {
                    if (b.type === transactionType) {
                        return a + b[propertyName];
                    } else {
                        return a;
                    }
                }, 0);
            },
            addTransaction: function(transaction, amountData) {
                transactionDetails.push(transaction);
                if (transaction.type === transactionType1) {
                    amountData.totalIncomeAmount += parseFloat(transaction.amount);
                    amountData.availableBalance += parseFloat(transaction.amount);
                } else {
                    amountData.totalExpenseAmount += parseFloat(transaction.amount);
                    amountData.availableBalance -= parseFloat(transaction.amount);
                }
                return amountData;
            },
            editTransaction: function(transaction) {
                selectedTransaction = transaction;
                transactionCopy.notes = transaction.notes;
                transactionCopy.amount = transaction.amount;
                transactionCopy.category = transaction.category;
                transactionCopy.date = transaction.date;
                transactionCopy.payee = transaction.payee;
                transactionCopy.payer = transaction.payer;
                transactionCopy.type = transaction.type;
                transactionCopy.mop = transaction.mop;
                transactionCopy.subCategory = {};
                transactionCopy.subCategory.parentCategoryName = transaction.category;
                transactionCopy.subCategory.subCategoryName = transaction.subCategory.subCategoryName;
                return transactionCopy;
            },
            setTransaction: function(transaction, amountData) {
                selectedTransaction.notes = transaction.notes;
                if (parseFloat(selectedTransaction.amount) !== parseFloat(transaction.amount)) {
                    if (transaction.type === transactionType1) {
                        amountData.totalIncomeAmount -= parseFloat(selectedTransaction.amount);
                        amountData.totalIncomeAmount += parseFloat(transaction.amount)

                    }
                    else {
                        amountData.totalExpenseAmount -= parseFloat(selectedTransaction.amount);
                        amountData.totalExpenseAmount += parseFloat(transaction.amount);
                    }
                    amountData.availableBalance = parseFloat(amountData.totalIncomeAmount) - parseFloat(amountData.totalExpenseAmount);
                }
                selectedTransaction.amount = transaction.amount;
                selectedTransaction.category = transaction.category;
                selectedTransaction.date = transaction.date;
                selectedTransaction.subCategory = {};
                selectedTransaction.payee = transaction.payee;
                selectedTransaction.payer = transaction.payer;
                selectedTransaction.mop = transaction.mop;
                selectedTransaction.subCategory.parentCategoryName = transaction.category;
                selectedTransaction.subCategory.subCategoryName = transaction.subCategory.subCategoryName;
                var updatedTransactionandAmountData = {
                    updatedTransaction: selectedTransaction,
                    updatedamountData: amountData
                };
                return updatedTransactionandAmountData;
            },
            deleteTransaction: function(transaction, amountData) {
                if (transaction.type === transactionType1) {
                    amountData.totalIncomeAmount -= parseFloat(transaction.amount);
                }
                else {
                    amountData.totalExpenseAmount -= parseFloat(transaction.amount);
                }
                amountData.availableBalance = parseFloat(amountData.totalIncomeAmount) - parseFloat(amountData.totalExpenseAmount);
                for (var i = 0; i < transactionDetails.length; i++) {
                    if (transactionDetails[i].transactionID === transaction.transactionID)
                        transactionDetails.splice(i, 1);
                }
                return amountData;
            }
        };
    }]);