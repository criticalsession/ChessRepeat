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
        if (this.pt.isKing(this.piece)) movePositions = this.getKingMoves();
        if (this.pt.isPawn(this.piece)) movePositions = this.getPawnMoves();
        if (this.pt.isHorsey(this.piece)) movePositions = this.getHorseyMoves();
        if (this.pt.isRook(this.piece)) movePositions = this.getCrossMoves();

        return movePositions;
    }

    getPawnMoves() {
        let movePositions = [];

        if (this.pt.isWhite(this.piece)) {
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

        return movePositions;
    }

    getHorseyMoves() {
        let movePositions = [];

        movePositions.push({ x: this.piece.positionX - 1, y: this.piece.positionY + 2 });
        movePositions.push({ x: this.piece.positionX - 1, y: this.piece.positionY - 2 });
        movePositions.push({ x: this.piece.positionX - 2, y: this.piece.positionY + 1 });
        movePositions.push({ x: this.piece.positionX - 2, y: this.piece.positionY - 1 });
        movePositions.push({ x: this.piece.positionX + 1, y: this.piece.positionY - 2 });
        movePositions.push({ x: this.piece.positionX + 1, y: this.piece.positionY + 2 });
        movePositions.push({ x: this.piece.positionX + 2, y: this.piece.positionY + 1 });
        movePositions.push({ x: this.piece.positionX + 2, y: this.piece.positionY - 1 });

        return this.removeInvalid(movePositions);
    }

    getCrossMoves() {
        let movePositions = [];

        for (let x = this.piece.positionX + 1; x <= 8; x++) {
            movePositions.push({ x: x, y: this.piece.positionY });

            if (this.theresAPieceOnTile(x, this.piece.positionY)) break;
        }

        for (let x = this.piece.positionX - 1; x >= 1; x--) {
            movePositions.push({ x: x, y: this.piece.positionY });

            if (this.theresAPieceOnTile(x, this.piece.positionY)) break;
        }

        for (let y = this.piece.positionY + 1; y <= 8; y++) {
            movePositions.push({ x: this.piece.positionX, y: y });

            if (this.theresAPieceOnTile(this.piece.positionX, y)) break;
        }

        for (let y = this.piece.positionY - 1; y >= 1; y--) {
            movePositions.push({ x: this.piece.positionX, y: y });

            if (this.theresAPieceOnTile(this.piece.positionX, y)) break;
        }

        return this.removeInvalid(movePositions);
    }

    getKingMoves() {
        let movePositions = [];

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x !== 0 || y !== 0) {
                    movePositions.push({ x: this.piece.positionX + x, y: this.piece.positionY + y });
                }
            }
        }

        return this.removeInvalid(movePositions);
    }

    theresAPieceOnTile(x, y) {
        return this.getPieceOnTile(x, y) !== null;
    }

    removeInvalid(movePositions) {
        return movePositions.filter(m => m.x >= 1 && m.x <= 8 && m.y >= 1 && m.y <= 8);
    }

    shouldPromote() {
        return (this.pt.isPawn(this.piece)) && ((this.pt.isWhite(this.piece) && this.piece.positionY === 1) || (!this.pt.isWhite(this.piece) && this.piece.positionY === 8));
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