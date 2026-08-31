class ApiFeatures {

    constructor (baseQuery , queryString){
        this.baseQuery = baseQuery;
        this.queryString = queryString;
    }

    filter(){

        const filterobj = {...this.queryString};
        excludedObj = ['page' , 'limit' , 'sort' , 'fields' , 'keyword'];
        excludedObj.forEach(element => {
            delete filterobj[element];
        });
        let querystr = JSON.stringify(filterobj);
        querystr = querystr.replace(/\b(gte|gt|lt|lte)\b/g , (match) => `$${match}`);
        this.baseQuery = Product.find(JSON.parse(querystr));
        return this;
    }

    search(modelName){

        if(this.queryString.keyword){
            if(modelName === "Product")
            {
                const searchQuery = {
                $or: [
                { title: { $regex: req.query.keyword, $options: 'i' } },
                { description: { $regex: req.query.keyword, $options: 'i' } },
                ],
                };
                this.baseQuerybaseQuery = this.baseQuery.find(searchQuery);
            }
            else if(modelName === "Category"){
                const searchQuery = {
                $or: [
                { name : { $regex: req.query.keyword, $options: 'i' } },
                { description: { $regex: req.query.keyword, $options: 'i' } },
                ],
                };
                this.baseQuerybaseQuery = this.baseQuery.find(searchQuery);
            }

            else {
                const searchQuery = {
                $or: [
                { name : { $regex: req.query.keyword, $options: 'i' } }
                ],
                };
                this.baseQuerybaseQuery = this.baseQuery.find(searchQuery);
            }
        }
        return this;
        }
            

    sorting(){

        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.baseQuery = this.baseQuery.sort(sortBy);
        } 
        else {
            this.baseQuery = this.baseQuery.sort('-createdAt');
        }

        return this;
    }

    pagination(){

        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit *1 || 5;
        const skip = (page -1) * limit ;
        this.baseQuery = this.baseQuery.skip(skip).limit(limit);
        return this;
    }

    fieldLimiting(){
        if(this.queryString.fields){
        const neededFields = this.queryString.fields.split(',').join(' ');
        this.baseQuery = this.baseQuery.select(neededFields);
        }
        return this;
    }
}

export default ApiFeatures;