export interface ApiResourceInterface {
    getAll();
    getOne(request: any);
    create(reques: any);
    remove(request: any);
    update(request: any);
}