CREATE PROCEDURE [dbo].[P_INS_RequestLog]
    @Request NVARCHAR(MAX),
    @Response NVARCHAR(MAX) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

	-- INIT
	SET @Response = ''

	-- DECLARE
	DECLARE @Position INTEGER = JSON_VALUE(@Request,'$.Position')
	DECLARE @UserId NVARCHAR(50) = JSON_VALUE(@Request,'$.UserId')
	DECLARE @Result NVARCHAR(MAX) = JSON_VALUE(@Request,'$.Result')

	-- User ID
	IF (@UserId IS NULL OR @UserId='')
	BEGIN
		SET @UserId = NULL
	END

	-- EXECUTION
	INSERT INTO RequestLog (UserId, Position, Result) VALUES (@UserId, @Position, @Result)
	SET @Response = @@ROWCOUNT
END