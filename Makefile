.PHONY: run-api
run-api:
	@dotnet run --project WebApi
	
.PHONY: run-silo
run-silo:
	@dotnet run --project Silo

.PHONY: run-client
run-client:
	@yarn --cwd WebClient start

.PHONY: test-backend
test-backend:
	@dotnet test 

.PHONY: test-client
test-client:
	@yarn --cwd WebClient test
