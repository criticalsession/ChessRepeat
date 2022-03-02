export default class PieceType {
    static PAWN = 1;
    static HORSEY = 2;
    static BISHOP = 3;
    static ROOK = 4;
    static QUEEN = 5;
    static KING = 6;

    isPawn(p) {
        return p.type === PieceType.PAWN;
    }

    isHorsey(p) {
        return p.type === PieceType.HORSEY;
    }

    isBishop(p) {
        return p.type === PieceType.BISHOP;
    }

    isRook(p) {
        return p.type === PieceType.ROOK;
    }

    isQueen(p) {
        return p.type === PieceType.QUEEN;
    }

    isKing(p) {
        return p.type === PieceType.KING;
    }

    isWhite(p) {
        return p.color === 1;
    }
}