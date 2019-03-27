export const isNullOrUndefined = (value) => (typeof value === 'undefined' || 
                                                    value === null || 
                                                    value.length === null || 
                                                    value.length === 0);