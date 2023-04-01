using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Serialization;

namespace API.DTOs;

public class RegisterDto
{
    [Microsoft.Build.Framework.Required]
    public string DisplayName { get; set; }
    [Microsoft.Build.Framework.Required]
    public string UserName { get; set; }
    [Microsoft.Build.Framework.Required]
    [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}", ErrorMessage = "Password does not meet requirements")]
    public string Password { get; set; }
    [Required]
    public string Email { get; set; }
}