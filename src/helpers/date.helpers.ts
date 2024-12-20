export function getPreviousSaturdayFormattedDate(): string {
    let d = new Date();
    
    if(d.getUTCDay() != 6) {
        const diff = d.getUTCDay() + 1
        d.setUTCDate(d.getUTCDate() - diff);
    }
    
    //ISO String converts to UTC. Fine for now
    return d.toISOString().split('T')[0]
}

export function getNextSundayFormattedDate(): string {
    let d = new Date();
    
    if(d.getUTCDay() != 0) {
        const diff = 7 - d.getUTCDay();
        d.setUTCDate(d.getUTCDate() + diff);
    }
    
    //ISO String converts to UTC. Fine for now
    return d.toISOString().split('T')[0]
}
