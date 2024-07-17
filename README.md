<img align="left" style="margin-right:40px; margin-bottom:80px;" width="180" height="80" src="./docs/a-logo-docs.png" alt="ADAAS Logo">

# A-Express SDK

| LTS | Latest | npm               |
|---------------|----------|---------------------------|
| v1.0.0      |   v1.0.1    |     [@adaas/a-express](https://npm.com)    |


##  Install SDK

```bash

cd /your/project/location
npm i @adaas/a-express

```


Define your controller with overwritten method 

```typescript
  class Test extends A_EXPRESS_EntityController {
    protected CONTROLLER_CONFIG: A_SDK_TYPES__Required<Partial<A_EXPRESS_TYPES__EntityControllerConfig<A_SDK_TYPES__Dictionary<any>>>, ['entity']> = {
        entity: 'users',
    };
    @A_EXPRESS_Get({
        path: '/test',
        config: {
            identity: false,
            auth: false
        }
    })
    @A_EXPRESS_ValidateAccess<Test>((qb, self, req) => {
        return qb.action('read');
    })
    @A_EXPRESS_ValidateAccess<Test>((qb, self, req) => {
        return qb.action('read2');
    })
    async test(req: any, res: any, next: any) {
        console.log('test')
        return res.status(200).send({
            message: 'test'
        });
    }
}
```


Create a new Express app and assign new routes 

```typescript
const app = express();

app.use(A_EXPRESS_Routes([Test]));

const port = 3000;

(async () => {
    const server = createServer(app);
    
    await server.listen(
        port,
        () => console.info(`Server running on port ${port}`)
    );
})();
```

