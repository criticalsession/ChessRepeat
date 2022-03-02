import PieceType from './PieceType.js';

export default class Movement {
    getMovePositions(piece) {
        const pt = new PieceType();
        let movePositions = [];
        if (pt.isPawn(piece)) movePositions = this.getPawnMove(pt, piece);
        if (pt.isHorsey(piece)) movePositions = this.getHorseyMove(pt, piece);

        return movePositions;
    }

    getPawnMove(pt, piece) {
        let movePositions = [];

        if (pt.isWhite(piece)) {
            if (piece.positionY === 7) {
                movePositions.push({
                    x: piece.positionX,
                    y: piece.positionY - 2
                });
            }

            movePositions.push({
                x: piece.positionX,
                y: piece.positionY - 1
            });
        }
        else {
            if (piece.positionY === 2) {
                movePositions.push({
                    x: piece.positionX,
                    y: piece.positionY + 2
                });
            }

            movePositions.push({
                x: piece.positionX,
                y: piece.positionY + 1
            });
        }

        return movePositions;
    }

    getHorseyMove(pt, piece) {
        let movePositions = [];

        if (piece.positionX > 1) {
            if (piece.positionY <= 6)
                movePositions.push({ x: piece.positionX - 1, y: piece.positionY + 2 });
            
            if (piece.positionY >= 3)
                movePositions.push({ x: piece.positionX - 1, y: piece.positionY - 2 });

            if (piece.positionX > 2) {
                if (piece.positionY <= 7)
                    movePositions.push({ x: piece.positionX - 2, y: piece.positionY + 1 });
                
                if (piece.positionY >= 2)
                    movePositions.push({ x: piece.positionX - 2, y: piece.positionY - 1 });
            }
        }

        if (piece.positionX < 8) {
            if (piece.positionY >= 3)
                movePositions.push({ x: piece.positionX + 1, y: piece.positionY - 2 });
            
            if (piece.positionY <= 6)
                movePositions.push({ x: piece.positionX + 1, y: piece.positionY + 2 });

            if (piece.positionX < 7) {
                if (piece.positionY <= 7)
                    movePositions.push({ x: piece.positionX + 2, y: piece.positionY + 1 });
                
                if (piece.positionY >= 2)
                    movePositions.push({ x: piece.positionX + 2, y: piece.positionY - 1 });
            }
        }

        return movePositions;
    }

    shouldPromote(piece) {
        const pt = new PieceType();
        return (pt.isPawn(piece)) && ((pt.isWhite(piece) && piece.positionY === 1) || (!pt.isWhite(piece) && piece.positionY === 8));
    }
}