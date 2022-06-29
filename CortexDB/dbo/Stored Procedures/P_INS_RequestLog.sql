CREATE PROCEDURE [dbo].[P_INS_RequestLog]
    @Request NVARCHAR(MAX),
    @Response NVARCHAR(MAX) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

	-- INIT
	SET @Response = ''

	-- DECLARE
	DECLARE @Count INT
	DECLARE @Position INTEGER = JSON_VALUE(@Request,'$.Position')
	DECLARE @UserId NVARCHAR(50) = JSON_VALUE(@Request,'$.UserId')
	DECLARE @Result NVARCHAR(MAX) = JSON_VALUE(@Request,'$.Result')

	-- VALIDATION
	SET @Count = (SELECT COUNT(*) FROM RequestLog WHERE UserId = @UserId AND Position = @Position)

	-- EXECUTION
	IF (@Count = 0)
	BEGIN
		INSERT INTO RequestLog (UserId, Position, Result) VALUES (@UserId, @Position, @Result)
		SET @Response = @@ROWCOUNT
	END
	ELSE
	BEGIN
		UPDATE RequestLog SET Date = GETDATE() WHERE UserId = @UserId AND Position = @Position
		SET @Response = @@ROWCOUNT
	END
END