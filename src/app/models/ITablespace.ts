
export interface ITablespace {

    TABLESPACE : string;
    INITIAL_EXT : string;
    NEXT_EXT: string;
    MIN_EXT: string;
    MAX_EXT: string;
    PCT_INCREASE: string;
    datafile : string;
    size: string;
    
}