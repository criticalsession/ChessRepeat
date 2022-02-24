import PieceType from './PieceType.js';

export default class FENReader {
    convert(fen) {
        let indexX = 1;
        let indexY = 1;

        let pieces = [];

        for (let character of fen) {
            switch (character) {
                case '/':
                    indexY++;
                    indexX = 1;
                    break;
                case 'p':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.PAWN, 0));
                    indexX++;
                    break;
                case 'P':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.PAWN, 1));
                    indexX++;
                    break;
                case 'n':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.HORSEY, 0));
                    indexX++;
                    break;
                case 'N':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.HORSEY, 1));
                    indexX++;
                    break;
                case 'b':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.BISHOP, 0));
                    indexX++;
                    break;
                case 'B':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.BISHOP, 1));
                    indexX++;
                    break;
                case 'r':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.ROOK, 0));
                    indexX++;
                    break;
                case 'R':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.ROOK, 1));
                    indexX++;
                    break;
                case 'q':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.QUEEN, 0));
                    indexX++;
                    break;
                case 'Q':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.QUEEN, 1));
                    indexX++;
                    break;
                case 'k':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.KING, 0));
                    indexX++;
                    break;
                case 'K':
                    pieces.push(this.newPiece(indexX, indexY, PieceType.KING, 1));
                    indexX++;
                    break;
                default:
                    indexX += parseInt(character);
                    break;
            }
        }

        return pieces;
    }

    newPiece(x, y, type, color) {
        return {
            positionX: x,
            positionY: y,
            type: type,
            color: color,
        }
    }
}

