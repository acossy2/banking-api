const db = require('../models/accountModel');

// Get account balance
exports.getBalance = (req, res) => {
    const accountId = req.params.accountId;
    db.query('SELECT balance FROM accounts WHERE id = ?', [accountId], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
};

// Get transactions with pagination
exports.getTransactions = (req, res) => {
    const accountId = req.params.accountId;
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const offset = (page - 1) * size;

    db.query('SELECT * FROM transactions WHERE accountId = ? LIMIT ? OFFSET ?', 
    [accountId, size, offset], (err, results) => {
        if (err) throw err;
        res.json({
            accountId,
            transactions: results,
            pagination: {
                currentPage: page,
                totalItems: results.length,
            }
        });
    });
};

// Transfer funds
exports.transfer = (req, res) => {
    const { creditorAccountId, amount, currency } = req.body;
    const accountId = req.params.accountId;

    // Business logic for transfer
    db.query('UPDATE accounts SET balance = balance - ? WHERE id = ?', [amount, accountId], (err, results) => {
        if (err) throw err;
        db.query('UPDATE accounts SET balance = balance + ? WHERE id = ?', [amount, creditorAccountId], (err, results) => {
            if (err) throw err;
            res.json({ status: 'success', amount, accountId, creditorAccountId });
        });
    });
};