export class HelperClass{

    static isEmpty(value:any)
    {
        return (!value || 0 === value.length || /^\s*$/.test(value));
    }
}