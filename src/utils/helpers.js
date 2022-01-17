export const formatTicksY = (tick) => {
    if (tick !== undefined) {
        return `$${(tick / 1e9).toFixed(1)} млрд`;
    } else {
        return '';
    }
    
};

export const formatTicksX = (tick) => {
    if (tick !== undefined) {
        return "'" + `${tick}`.slice(-2);
    } else {
        return '';
    }
    
}