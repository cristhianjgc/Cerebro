CREATE PROCEDURE [dbo].[P_UPD_User]
    @Request NVARCHAR(MAX),
    @Response NVARCHAR(MAX) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

	-- INIT
	SET @Response = ''

	-- DECLARE
	DECLARE @Email NVARCHAR(50) = JSON_VALUE(@Request,'$.Email')
	DECLARE @UserId NVARCHAR(50) = JSON_VALUE(@Request,'$.UserId')
	DECLARE @Nickname NVARCHAR(50) = JSON_VALUE(@Request,'$.Nickname')
	DECLARE @Username NVARCHAR(50) = JSON_VALUE(@Request,'$.Username')

	-- EXECUTION
	UPDATE
		Users
	SET
        Email = @Email,
        Nickname = @Nickname,
        Username = @Username
	WHERE
		Id = @UserId
	SET @Response = @UserId
END
