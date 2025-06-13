type dataType = {
    comment: string,
    emotion : string,
    time: Date,
}

const data : dataType[] = [];

const append = (
    {
        body
    } : {
        body : dataType
    }) => {

        data.push(body);
        return "Data added successfully";
    };

const getAllData = ()=> {
    return data;
}

export {
    append,
    getAllData
};
export type { dataType };

