CREATE PROCEDURE [dbo].[P_INS_User]
    @Request NVARCHAR(MAX),
    @Response NVARCHAR(MAX) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

	-- INIT
	SET @Response = ''

	-- DECLARE
	DECLARE @Email NVARCHAR(50)
	DECLARE @UserId NVARCHAR(50)
	DECLARE @Nickname NVARCHAR(50)
	DECLARE @Username NVARCHAR(50)

	-- EXECUTION
	IF (@Request IS NULL OR @Request='')
	BEGIN
		SET @UserId = NEWID()
		INSERT INTO Users (Id) VALUES (@UserId)
		SET @Response = @UserId
	END
	ELSE
	BEGIN
		-- Email
		SET @Email = JSON_VALUE(@Request,'$.Email')
		IF (@Email IS NULL OR @Email='')
		BEGIN
			SET @Email = NULL
		END

		-- UserId
		SET @UserId = JSON_VALUE(@Request,'$.UserId')
		IF (@UserId IS NULL OR @UserId='')
		BEGIN
			SET @UserId = NEWID()
		END

		-- Nickname
		SET @Nickname = JSON_VALUE(@Request,'$.Nickname')
		IF (@Nickname IS NULL OR @Nickname='')
		BEGIN
			SET @Nickname = NULL
		END

		-- Username
		SET @Username = JSON_VALUE(@Request,'$.Username')
		IF (@Username IS NULL OR @Username='')
		BEGIN
			SET @Username = NULL
		END

		INSERT INTO Users (Id, Email, Nickname, Username) VALUES (@UserId, @Email, @Nickname, @Username)
		SET @Response = @UserId
	END
END
