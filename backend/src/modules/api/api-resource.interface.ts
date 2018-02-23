export interface ApiResourceInterface {
    findAll();
    findOne(params: any);
    create(req: Request);
    remove(params: any);
    update(params: any);
}