.PHONY: run-api
run-api:
	@dotnet run --project WebApi
	
.PHONY: run-silo
run-silo:
	@dotnet run --project Silo

.PHONY: run-client
run-client:
	@yarn --cwd WebClient start
