import PieceType from './PieceType.js';

export default class Movement {
    constructor(pov, pieces) {
        this.pov = pov;
        this.pieces = pieces;
        this.piece = null;
        this.pt = new PieceType();
    }

    getMovePositions(piece) {
        this.piece = piece;

        let movePositions = [];
        if (this.pt.isKing(piece)) movePositions = this.getKingMoves();
        if (this.pt.isPawn(piece)) movePositions = this.getPawnMoves();
        if (this.pt.isHorsey(piece)) movePositions = this.getHorseyMoves();
        if (this.pt.isRook(piece)) movePositions = this.getCrossMoves();
        if (this.pt.isBishop(piece)) movePositions = this.getDiagonalMoves();
        if (this.pt.isQueen(piece)) movePositions = [...this.getCrossMoves(), ...this.getDiagonalMoves()];

        return movePositions;
    }

    isKingInCheck(king) {
        this.piece = king;

        let inCheck = false;

        if (this.pt.isKing(king)) {
            let positionRay = [];
            
            // check knight checks
            positionRay = this.getHorseyMoves(false);

            positionRay.forEach(coord => {
                const pieceOnTile = this.getPieceOnTile(coord.x, coord.y);
                if (pieceOnTile !== null && pieceOnTile.color !== king.color && this.pt.isHorsey(pieceOnTile)) {
                    inCheck = true;
                }
            });

            if (!inCheck) {
                // check cross checks
                positionRay = this.getCrossMoves(false);

                positionRay.filter(p => p.pieceOnTile).forEach(coord => {
                    const pieceOnTile = this.getPieceOnTile(coord.x, coord.y);
                    if (pieceOnTile !== null && pieceOnTile.color !== king.color && (this.pt.isQueen(pieceOnTile) || this.pt.isRook(pieceOnTile))) {
                        inCheck = true;
                    }
                });
            }

            if (!inCheck) {
                // check diagonal checks
                positionRay = this.getDiagonalMoves(false);

                positionRay.filter(p => p.pieceOnTile).forEach(coord => {
                    const pieceOnTile = this.getPieceOnTile(coord.x, coord.y);
                    if (pieceOnTile !== null && pieceOnTile.color !== king.color && (this.pt.isQueen(pieceOnTile) || this.pt.isBishop(pieceOnTile))) {
                        inCheck = true;
                    }
                });
            }
        }

        return inCheck;
    }

    getKings() {
        return this.pieces.filter(p => p.type === PieceType.KING);
    }

    getMyKing(color) {
        return this.getKings().filter(p => p.color === color)[0];
    }

    getPawnMoves() {
        let movePositions = [];

        if (this.piece.color === PieceType.WHITE) {
            if (!this.theresAPieceOnTile(this.piece.positionX, this.piece.positionY - 1)) {
                movePositions.push({
                    x: this.piece.positionX,
                    y: this.piece.positionY - 1
                });

                if (!this.theresAPieceOnTile(this.piece.positionX, this.piece.positionY - 2) && this.piece.positionY === 7) {
                    movePositions.push({
                        x: this.piece.positionX,
                        y: this.piece.positionY - 2
                    });
                }
            }
        }
        else {
            if (!this.theresAPieceOnTile(this.piece.positionX, this.piece.positionY + 1)) {
                movePositions.push({
                    x: this.piece.positionX,
                    y: this.piece.positionY + 1
                });

                if (!this.theresAPieceOnTile(this.piece.positionX, this.piece.positionY + 2) && this.piece.positionY === 2) {
                    movePositions.push({
                        x: this.piece.positionX,
                        y: this.piece.positionY + 2
                    });
                }
            }
        }

        return this.removeInvalid(movePositions);
    }

    getHorseyMoves(checkForChecks) {
        let movePositions = [];

        movePositions.push({ x: this.piece.positionX - 1, y: this.piece.positionY + 2 });
        movePositions.push({ x: this.piece.positionX - 1, y: this.piece.positionY - 2 });
        movePositions.push({ x: this.piece.positionX - 2, y: this.piece.positionY + 1 });
        movePositions.push({ x: this.piece.positionX - 2, y: this.piece.positionY - 1 });
        movePositions.push({ x: this.piece.positionX + 1, y: this.piece.positionY - 2 });
        movePositions.push({ x: this.piece.positionX + 1, y: this.piece.positionY + 2 });
        movePositions.push({ x: this.piece.positionX + 2, y: this.piece.positionY + 1 });
        movePositions.push({ x: this.piece.positionX + 2, y: this.piece.positionY - 1 });

        return this.removeInvalid(movePositions, checkForChecks);
    }

    getCrossMoves(checkForChecks) {
        let movePositions = [];

        for (let x = this.piece.positionX + 1; x <= 8; x++) {
            let newPosition = { x: x, y: this.piece.positionY, pieceOnTile: false };
            movePositions.push(newPosition);

            if (this.theresAPieceOnTile(newPosition.x, newPosition.y)) { newPosition.pieceOnTile = true; break; }
        }

        for (let x = this.piece.positionX - 1; x >= 1; x--) {
            let newPosition = { x: x, y: this.piece.positionY, pieceOnTile: false };
            movePositions.push(newPosition);

            if (this.theresAPieceOnTile(newPosition.x, newPosition.y)) { newPosition.pieceOnTile = true; break; }
        }

        for (let y = this.piece.positionY + 1; y <= 8; y++) {
            let newPosition = { x: this.piece.positionX, y: y, pieceOnTile: false };
            movePositions.push(newPosition);

            if (this.theresAPieceOnTile(newPosition.x, newPosition.y)) { newPosition.pieceOnTile = true; break; }
        }

        for (let y = this.piece.positionY - 1; y >= 1; y--) {
            let newPosition = { x: this.piece.positionX, y: y, pieceOnTile: false };
            movePositions.push(newPosition);

            if (this.theresAPieceOnTile(newPosition.x, newPosition.y)) { newPosition.pieceOnTile = true; break; }
        }

        return this.removeInvalid(movePositions, checkForChecks);
    }

    getDiagonalMoves(checkForChecks) {
        let movePositions = [];

        [1, -1].forEach(xMult => {
            [1, -1].forEach(yMult => {
                for (let inc = 1; inc <= 8; inc++) {
                    let newPosition = {
                        x: this.piece.positionX + (inc * xMult),
                        y: this.piece.positionY + (inc * yMult),
                        pieceOnTile: false };
        
                    movePositions.push(newPosition);
        
                    if (this.theresAPieceOnTile(newPosition.x, newPosition.y )) { newPosition.pieceOnTile = true; break; }
                }
            });
        });

        return this.removeInvalid(movePositions, checkForChecks);
    }

    getKingMoves() {
        let movePositions = [];

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (!(x === 0 && y === 0)) {
                    let newPosition = { x: this.piece.positionX + x, y: this.piece.positionY + y, pieceOnTile: false };
                    movePositions.push(newPosition);

                    if (this.theresAPieceOnTile(newPosition.x, newPosition.y)) { newPosition.pieceOnTile = true; }
                }
            }
        }

        return this.removeInvalid(movePositions);
    }

    theresAPieceOnTile(x, y) {
        return this.getPieceOnTile(x, y) !== null;
    }

    removeInvalid(movePositions, checkForChecks) {
        movePositions = movePositions.filter(m => m.x >= 1 && m.x <= 8 && m.y >= 1 && m.y <= 8); //filter out of bounds

        if (checkForChecks !== false) {
            let filteredPositions = [];
            let kingChecker = new Movement(this.pov, []);

            // will this move put me in check?
            movePositions.forEach(coord => {
                let simPieces = this.pieces.filter(p => p !== this.piece);

                simPieces.push({ 
                    positionX: coord.x,
                    positionY: coord.y,
                    type: this.piece.type,
                    color: this.piece.color,
                    isInCheck: this.piece.isInCheck,
                });

                kingChecker.pieces = simPieces;
                const myKing = kingChecker.getMyKing(this.piece.color);

                if (!kingChecker.isKingInCheck(myKing)) filteredPositions.push(coord);
            })

            return filteredPositions;
        } else return movePositions;
    }

    shouldPromote() {
        return (this.pt.isPawn(this.piece)) && ((this.piece.color === PieceType.WHITE && this.piece.positionY === 1) || (this.piece.color === PieceType.BLACK && this.piece.positionY === 8));
    }

    adjustToAbsolute(coord) {
        if (this.pov === 0) {
            return 9 - coord;
        } else return coord;
    }

    getPieceOnTile(x, y) {
        const pieceOnTile = this.pieces.filter(p => p.positionX === x && p.positionY === y);

        if (pieceOnTile.length > 0) return pieceOnTile[0];
        else return null;
    }
}