// src/components/TicTacToe.js
import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);

    const handleClick = (row, col) => {
        if (board[row][col] || winner) return; // Ignore clicks on occupied or finished board

        // Update the board state
        const updatedBoard = board.map((rowArray, rowIndex) =>
            rowArray.map((cell, colIndex) =>
                rowIndex === row && colIndex === col ? currentPlayer : cell
            )
        );

        setBoard(updatedBoard);

        // Check for a winner or a draw
        if (checkWinner(updatedBoard)) {
            setWinner(currentPlayer);
        } else if (updatedBoard.flat().every((cell) => cell !== null)) {
            setWinner("Draw");
        } else {
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    };

    const checkWinner = (board) => {
        // Check rows, columns, and diagonals
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] &&
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]
            )
                return true; // Row win
            if (
                board[0][i] &&
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i]
            )
                return true; // Column win
        }
        if (
            board[0][0] &&
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2]
        )
            return true; // Diagonal win
        if (
            board[0][2] &&
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0]
        )
            return true; // Reverse diagonal win

        return false;
    };

    const resetGame = () => {
        setBoard(Array(3).fill(Array(3).fill(null)));
        setCurrentPlayer("X");
        setWinner(null);
    };

    return (
        <div className="tic-tac-toe">
            <h1>Tic Tac Toe</h1>
            <div className="board">
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <button
                            key={`${rowIndex}-${colIndex}`}
                            className="cell"
                            onClick={() => handleClick(rowIndex, colIndex)}
                        >
                            {cell}
                        </button>
                    ))
                )}
            </div>
            {winner && (
                <div className="game-info">
                    {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}
                </div>
            )}
            <button className="reset-button" onClick={resetGame}>
                Restart Game
            </button>
        </div>
    );
};

export default TicTacToe;
