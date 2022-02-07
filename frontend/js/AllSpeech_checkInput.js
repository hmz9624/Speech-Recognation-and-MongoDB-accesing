export default class CheckInput {
    constructor() {

    }

    checkStart = (start, length) => {
        if (start < 0 || start > (length - 1)) {
            return 0;
        } else {
            return start
        }
    }

    checkEnd = (startNumber,end, length) => {
        if (end < startNumber || end > length) {
            return length
        } else {
            return end
        }
    }
}