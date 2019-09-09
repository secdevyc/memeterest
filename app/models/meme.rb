class Meme
  if(ENV['DATABASE_URL'])
          uri = URI.parse(ENV['DATABASE_URL'])
          DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
      else
          DB = PG.connect({:host => "localhost", :port => 5432, :dbname => 'memeterest_development'})
      end

  def self.all
    results = DB.exec("SELECT * FROM memes;")
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "image" => result["image"],
        "name" => result["name"],
        "text" => result["text"]
      }
    end
  end

  #show
  def self.find(id)
    # query to find the posts
    results = DB.exec("SELECT * FROM memes WHERE id=#{id};")
    # if there are results, return the hash
    if !results.num_tuples.zero?
      return {
        "id" => results.first["id"].to_i,
        "name" => results.first["name"],
        "image" => results.first["image"],
        "text" => results.first["text"]
      }
    # if there are no results, return an error
    else
      return {
        "error" => "no such post, check the id!"
      }, status: 400
    end
  end

  # create
  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO memes (name, image, text)
        VALUES ('#{opts["name"]}', '#{opts["image"]}', '#{opts["text"]}')
        RETURNING id, name, image, text;
      SQL
    )
    return {
      "id" => results.first["id"].to_i,
      "name" => results.first["name"],
      "image" => results.first["image"],
      "text" => results.first["text"],
    }
  end

  #delete
  def self.delete(id)
    results = DB.exec("DELETE FROM memes WHERE id=#{id};")
    return { "deleted" => true }
  end

  #update
  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE memes
        SET name='#{opts["name"]}', image='#{opts["image"]}', text='#{opts["text"]}'
        WHERE id=#{id}
        RETURNING id, name, image, text
        SQL
      )
    return {
      "id" => results.first["id"].to_i,
      "name" => results.first["name"],
      "image" => results.first["image"],
      "text" => results.first["text"]
    }
  end

end
