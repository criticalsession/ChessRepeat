import PieceType from './PieceType.js';

export default class Movement {
    getMovePositions(piece) {
        const pt = new PieceType();
        let movePositions = [];

        if (pt.isPawn(piece)) {
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
        }

        return movePositions;
    }

    shouldPromote(piece) {
        const pt = new PieceType();
        return (pt.isPawn(piece)) && ((pt.isWhite(piece) && piece.positionY === 1) || (!pt.isWhite(piece) && piece.positionY === 8));
    }
}